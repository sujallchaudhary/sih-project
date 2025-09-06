const ProblemStatement = require('../models/ps.model');
const Bookmark = require('../models/bookmarkPs.model');
const ChoosenPs = require('../models/choosenPs.model');

const getAllProblemStatements = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const filter = {};

        if (req.query.category) {
            filter.category = { $regex: req.query.category, $options: 'i' };
        }

        if (req.query.theme) {
            filter.theme = { $regex: req.query.theme, $options: 'i' };
        }

        if (req.query.organization) {
            filter.organization = { $regex: req.query.organization, $options: 'i' };
        }

        if (req.query.department) {
            filter.department = { $regex: req.query.department, $options: 'i' };
        }

        if (req.query.difficultyLevel) {
            filter.difficultyLevel = req.query.difficultyLevel;
        }

        if (req.query.difficulties) {
            const difficultyArray = req.query.difficulties.split(',').map(d => d.trim());
            filter.difficultyLevel = { $in: difficultyArray };
        }

        if (req.query.search) {
            filter.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { summary: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Filter by tags
        if (req.query.tags) {
            const tagsArray = req.query.tags.split(',').map(tag => tag.trim());
            filter.tags = { $in: tagsArray };
        }

        // Filter by tech stack
        if (req.query.techStack) {
            const techArray = req.query.techStack.split(',').map(tech => tech.trim());
            filter.techStack = { $in: techArray };
        }

        // Filter by specific tech (single technology)
        if (req.query.technology) {
            filter.techStack = { $regex: req.query.technology, $options: 'i' };
        }

        // Date range filters
        if (req.query.createdAfter) {
            filter.createdAt = { $gte: new Date(req.query.createdAfter) };
        }
        if (req.query.createdBefore) {
            if (filter.createdAt) {
                filter.createdAt.$lte = new Date(req.query.createdBefore);
            } else {
                filter.createdAt = { $lte: new Date(req.query.createdBefore) };
            }
        }

        // Exclude specific IDs
        if (req.query.excludeIds) {
            const excludeArray = req.query.excludeIds.split(',').map(id => id.trim());
            filter.id = { $nin: excludeArray };
        }

        // Include only specific IDs
        if (req.query.includeIds) {
            const includeArray = req.query.includeIds.split(',').map(id => id.trim());
            filter.id = { $in: includeArray };
        }

        let sortOptions = {};
        if (req.query.sortBy) {
            const sortField = req.query.sortBy;
            const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
            sortOptions[sortField] = sortOrder;
            sortOptions._id = sortOrder;
        } else {
            sortOptions._id = -1;
        }

        // Execute query with pagination
        const problemStatements = await ProblemStatement.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .lean();

        // Add bookmark and team information if user is logged in
        let problemStatementsWithBookmarks = problemStatements;
        if (req.user && req.user.mongoId) {
            // Get bookmarks
            const bookmarks = await Bookmark.find({
                userId: req.user.mongoId,
                problemStatementId: { $in: problemStatements.map(ps => ps._id) },
                isDeleted: { $ne: true }
            }).lean();

            // Get team choices
            const teamChoices = await ChoosenPs.find({
                userId: req.user.mongoId,
                problemStatementId: { $in: problemStatements.map(ps => ps._id) },
                isDeleted: { $ne: true }
            }).lean();

            const bookmarkMap = new Map(bookmarks.map(bookmark => [bookmark.problemStatementId.toString(), true]));
            const teamChoiceMap = new Map(teamChoices.map(choice => [choice.problemStatementId.toString(), true]));

            problemStatementsWithBookmarks = problemStatements.map(ps => ({
                ...ps,
                isBookmarked: bookmarkMap.has(ps._id.toString()) || false,
                isAddedToTeam: teamChoiceMap.has(ps._id.toString()) || false
            }));
        } else {
            problemStatementsWithBookmarks = problemStatements.map(ps => ({
                ...ps,
                isBookmarked: false,
                isAddedToTeam: false
            }));
        }

        const totalCount = await ProblemStatement.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const response = {
            success: true,
            message: "Problem statements fetched successfully",
            data: problemStatementsWithBookmarks,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: totalCount,
                limit: limit,
                hasNextPage: hasNextPage,
                hasPrevPage: hasPrevPage,
                nextPage: hasNextPage ? page + 1 : null,
                prevPage: hasPrevPage ? page - 1 : null
            },
            filters: {
                applied: Object.keys(req.query).filter(key => 
                    !['page', 'limit', 'sortBy', 'sortOrder'].includes(key)
                ),
                totalFiltered: totalCount
            }
        };
        if (!problemStatements || problemStatements.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No problem statements found with the applied filters',
                ...response
            });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching problem statements:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching problem statements', 
            error: error.message 
        });
    }
};

const getProblemStatementById = async (req, res) => {
    try {
        const { id } = req.params;
        const problemStatement = await ProblemStatement.findOne({ id: id }).lean();

        if (!problemStatement) {
            return res.status(404).json({
                success: false,
                message: 'Problem statement not found'
            });
        }

        // Add bookmark and team information if user is logged in
        let isBookmarked = false;
        let isAddedToTeam = false;
        if (req.user && req.user.mongoId) {
            const bookmark = await Bookmark.findOne({
                userId: req.user.mongoId,
                problemStatementId: problemStatement._id,
                isDeleted: { $ne: true }
            });
            isBookmarked = !!bookmark;

            const teamChoice = await ChoosenPs.findOne({
                userId: req.user.mongoId,
                problemStatementId: problemStatement._id,
                isDeleted: { $ne: true }
            });
            isAddedToTeam = !!teamChoice;
        }

        const problemStatementWithData = {
            ...problemStatement,
            isBookmarked,
            isAddedToTeam
        };

        res.status(200).json({
            success: true,
            message: 'Problem statement fetched successfully',
            data: problemStatementWithData
        });
    } catch (error) {
        console.error('Error fetching problem statement:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching problem statement',
            error: error.message
        });
    }
};

const getFilterOptions = async (req, res) => {
    try {
        const [
            categories,
            themes,
            organizations,
            departments,
            difficultyLevels,
            allTags,
            allTechStack,
        ] = await Promise.all([
            ProblemStatement.distinct('category'),
            ProblemStatement.distinct('theme'),
            ProblemStatement.distinct('organization'),
            ProblemStatement.distinct('department'),
            ProblemStatement.distinct('difficultyLevel'),
            ProblemStatement.distinct('tags'),
            ProblemStatement.distinct('techStack'),
        ]);

        const filterOptions = {
            categories: categories.filter(Boolean),
            themes: themes.filter(Boolean),
            organizations: organizations.filter(Boolean),
            departments: departments.filter(Boolean),
            difficultyLevels: difficultyLevels.filter(Boolean),
            tags: allTags.filter(Boolean).sort(),
            techStack: allTechStack.filter(Boolean).sort(),

            popular: {
                tags: allTags.filter(Boolean).slice(0, 10),
                techStack: allTechStack.filter(Boolean).slice(0, 10)
            }
        };

        res.status(200).json({
            success: true,
            message: 'Filter options fetched successfully',
            data: filterOptions
        });
    } catch (error) {
        console.error('Error fetching filter options:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching filter options',
            error: error.message
        });
    }
};

const bookMarkPS = async(req,res)=>{
    const {psId} = req.body;
    const {mongoId} = req.user;

    try {
        const existingBookmark = await Bookmark.findOne({ userId: mongoId, problemStatementId: psId ,isDeleted:false});

        if (existingBookmark) {
            return res.status(400).json({
                success: false,
                message: 'Problem statement already bookmarked',
            });
        }

        const newBookmark = await Bookmark.create({
            userId: mongoId,
            problemStatementId: psId
        });

        if(!newBookmark){
            return res.status(400).json({
                success: false,
                message: 'Error bookmarking problem statement',
            });
        }

        res.status(201).json({
            success: true,
            message: 'Problem statement bookmarked successfully',
            data: newBookmark
        });
    } catch (error) {
        console.error('Error bookmarking problem statement:', error);
        res.status(500).json({
            success: false,
            message: 'Error bookmarking problem statement',
            error: error.message
        });
    }
};

const deleteBookMark = async (req, res) => {
    const { psId } = req.body;
    const { mongoId } = req.user;

    try {
        const deletedBookmark = await Bookmark.findOneAndUpdate(
            { userId: mongoId, problemStatementId: psId , isDeleted: false },
            { isDeleted: true },
            { new: true }
        );

        if (!deletedBookmark) {
            return res.status(404).json({
                success: false,
                message: 'Bookmark not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Bookmark deleted successfully',
            data: deletedBookmark
        });
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting bookmark',
            error: error.message
        });
    }
};

const addPsToTeam = async(req, res)=>{
    const {psId} = req.body;
    const {mongoId} = req.user;

    try {
        const existingChoosenPs = await ChoosenPs.findOne({ userId: mongoId, problemStatementId: psId ,isDeleted:false});

        if (existingChoosenPs) {
            return res.status(400).json({
                success: false,
                message: 'Problem statement already added to team',
            });
        }

        const newChoosenPs = await ChoosenPs.create({
            userId: mongoId,
            problemStatementId: psId,
            teamId: req.user.teamId
        });

        if(!newChoosenPs){
            return res.status(400).json({
                success: false,
                message: 'Error adding problem statement to team',
            });
        }

        res.status(201).json({
            success: true,
            message: 'Problem statement added to team successfully',
            data: newChoosenPs
        });
    } catch (error) {
        console.error('Error adding problem statement to team:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding problem statement to team',
            error: error.message
        });
    }
};

const deletePsFromTeam = async(req, res)=>{
    const {psId} = req.body;
    const {mongoId} = req.user;

    try {
        const deletedChoosenPs = await ChoosenPs.findOneAndUpdate(
            { userId: mongoId, problemStatementId: psId ,isDeleted:false},
            { isDeleted: true },
            { new: true }
        );

        if (!deletedChoosenPs) {
            return res.status(404).json({
                success: false,
                message: 'Problem statement not found in team',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Problem statement removed from team successfully',
            data: deletedChoosenPs
        });
    } catch (error) {
        console.error('Error removing problem statement from team:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing problem statement from team',
            error: error.message
        });
    }
};

const getTeamProblemStatements = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const { mongoId } = req.user;

        // Get user's team information
        const User = require('../models/user.model');
        const user = await User.findById(mongoId).populate('teamId');
        
        if (!user.teamId) {
            return res.status(400).json({
                success: false,
                message: 'User is not in a team',
            });
        }

        // Get all team members
        const teamMembers = await User.find({
            teamId: user.teamId._id
        }).select('_id').lean();

        const teamMemberIds = teamMembers.map(member => member._id);

        // Get problem statements chosen by team members
        const teamPsChoices = await ChoosenPs.find({
            userId: { $in: teamMemberIds },
            isDeleted: { $ne: true }
        }).populate('userId', 'name email photoURL').lean();

        if (!teamPsChoices || teamPsChoices.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No problem statements found for this team',
                data: [],
                pagination: {
                    currentPage: page,
                    totalPages: 0,
                    totalCount: 0,
                    limit: limit,
                    hasNextPage: false,
                    hasPrevPage: false,
                    nextPage: null,
                    prevPage: null
                },
                teamInfo: {
                    teamId: user.teamId._id,
                    teamName: user.teamId.name,
                    memberCount: teamMemberIds.length
                }
            });
        }

        const teamPsIds = teamPsChoices.map(choice => choice.problemStatementId);

        // Apply additional filters if provided
        const filter = {
            _id: { $in: teamPsIds },
            isDeleted: { $ne: true }
        };

        if (req.query.category) {
            filter.category = { $regex: req.query.category, $options: 'i' };
        }

        if (req.query.theme) {
            filter.theme = { $regex: req.query.theme, $options: 'i' };
        }

        if (req.query.difficultyLevel) {
            filter.difficultyLevel = req.query.difficultyLevel;
        }

        if (req.query.search) {
            filter.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { summary: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        if (req.query.tags) {
            const tagsArray = req.query.tags.split(',').map(tag => tag.trim());
            filter.tags = { $in: tagsArray };
        }

        if (req.query.techStack) {
            const techArray = req.query.techStack.split(',').map(tech => tech.trim());
            filter.techStack = { $in: techArray };
        }

        // Sorting options
        let sortOptions = {};
        if (req.query.sortBy) {
            const sortField = req.query.sortBy;
            const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
            sortOptions[sortField] = sortOrder;
            // Add _id as secondary sort to ensure consistent pagination
            sortOptions._id = sortOrder;
        } else {
            // Default sort by createdAt descending, then by _id for consistency
            sortOptions.createdAt = -1;
            sortOptions._id = -1;
        }

        // Execute query with pagination
        const problemStatements = await ProblemStatement.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .lean();

        // Add bookmark information for each problem statement
        const bookmarks = await Bookmark.find({
            userId: mongoId,
            problemStatementId: { $in: problemStatements.map(ps => ps._id) },
            isDeleted: { $ne: true }
        }).lean();

        const bookmarkMap = new Map(bookmarks.map(bookmark => [bookmark.problemStatementId.toString(), true]));

        // Add team context to each problem statement
        const problemStatementsWithTeamContext = problemStatements.map(ps => {
            const psChoices = teamPsChoices.filter(choice => 
                choice.problemStatementId.toString() === ps._id.toString()
            );
            
            const isChosenByCurrentUser = psChoices.some(choice => 
                choice.userId._id.toString() === mongoId.toString()
            );
            
            return {
                ...ps,
                isBookmarked: bookmarkMap.has(ps._id.toString()) || false,
                isAddedToTeam: isChosenByCurrentUser,
                teamContext: {
                    chosenBy: psChoices.map(choice => ({
                        userId: choice.userId._id,
                        userName: choice.userId.name,
                        userEmail: choice.userId.email,
                        userPhoto: choice.userId.photoURL,
                        chosenAt: choice.createdAt
                    })),
                    chosenCount: psChoices.length,
                    isChosenByCurrentUser: isChosenByCurrentUser
                }
            };
        });

        const totalCount = await ProblemStatement.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            success: true,
            message: "Team problem statements fetched successfully",
            data: problemStatementsWithTeamContext,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: totalCount,
                limit: limit,
                hasNextPage: hasNextPage,
                hasPrevPage: hasPrevPage,
                nextPage: hasNextPage ? page + 1 : null,
                prevPage: hasPrevPage ? page - 1 : null
            },
            filters: {
                applied: Object.keys(req.query).filter(key => 
                    !['page', 'limit', 'sortBy', 'sortOrder'].includes(key)
                ),
                totalFiltered: totalCount
            },
            teamInfo: {
                teamId: user.teamId._id,
                teamName: user.teamId.name,
                memberCount: teamMemberIds.length,
                totalPsChosen: teamPsIds.length
            }
        });

    } catch (error) {
        console.error('Error fetching team problem statements:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching team problem statements',
            error: error.message
        });
    }
};

const getBookmarkedProblemStatements = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const { mongoId } = req.user;

        // Get bookmarked problem statement IDs for the user
        const bookmarks = await Bookmark.find({
            userId: mongoId,
            isDeleted: { $ne: true }
        }).select('problemStatementId').lean();

        if (!bookmarks || bookmarks.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No bookmarked problem statements found',
                data: [],
                pagination: {
                    currentPage: page,
                    totalPages: 0,
                    totalCount: 0,
                    limit: limit,
                    hasNextPage: false,
                    hasPrevPage: false,
                    nextPage: null,
                    prevPage: null
                }
            });
        }

        const bookmarkedPsIds = bookmarks.map(bookmark => bookmark.problemStatementId);

        // Apply additional filters if provided
        const filter = {
            _id: { $in: bookmarkedPsIds },
            isDeleted: { $ne: true }
        };

        if (req.query.category) {
            filter.category = { $regex: req.query.category, $options: 'i' };
        }

        if (req.query.theme) {
            filter.theme = { $regex: req.query.theme, $options: 'i' };
        }

        if (req.query.organization) {
            filter.organization = { $regex: req.query.organization, $options: 'i' };
        }

        if (req.query.department) {
            filter.department = { $regex: req.query.department, $options: 'i' };
        }

        if (req.query.difficultyLevel) {
            filter.difficultyLevel = req.query.difficultyLevel;
        }

        if (req.query.search) {
            filter.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { summary: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        if (req.query.tags) {
            const tagsArray = req.query.tags.split(',').map(tag => tag.trim());
            filter.tags = { $in: tagsArray };
        }

        if (req.query.techStack) {
            const techArray = req.query.techStack.split(',').map(tech => tech.trim());
            filter.techStack = { $in: techArray };
        }

        // Sorting options
        let sortOptions = {};
        if (req.query.sortBy) {
            const sortField = req.query.sortBy;
            const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
            sortOptions[sortField] = sortOrder;
            // Add _id as secondary sort to ensure consistent pagination
            sortOptions._id = sortOrder;
        } else {
            // Default sort by createdAt descending, then by _id for consistency
            sortOptions.createdAt = -1;
            sortOptions._id = -1;
        }

        // Execute query with pagination
        const problemStatements = await ProblemStatement.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .lean();

        // Add isBookmarked: true and check isAddedToTeam for all results since these are bookmarked
        const teamChoices = await ChoosenPs.find({
            userId: mongoId,
            problemStatementId: { $in: problemStatements.map(ps => ps._id) },
            isDeleted: { $ne: true }
        }).lean();

        const teamChoiceMap = new Map(teamChoices.map(choice => [choice.problemStatementId.toString(), true]));

        const problemStatementsWithBookmarks = problemStatements.map(ps => ({
            ...ps,
            isBookmarked: true,
            isAddedToTeam: teamChoiceMap.has(ps._id.toString()) || false
        }));

        const totalCount = await ProblemStatement.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            success: true,
            message: "Bookmarked problem statements fetched successfully",
            data: problemStatementsWithBookmarks,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: totalCount,
                limit: limit,
                hasNextPage: hasNextPage,
                hasPrevPage: hasPrevPage,
                nextPage: hasNextPage ? page + 1 : null,
                prevPage: hasPrevPage ? page - 1 : null
            },
            filters: {
                applied: Object.keys(req.query).filter(key => 
                    !['page', 'limit', 'sortBy', 'sortOrder'].includes(key)
                ),
                totalFiltered: totalCount
            }
        });

    } catch (error) {
        console.error('Error fetching bookmarked problem statements:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bookmarked problem statements',
            error: error.message
        });
    }
};

module.exports = {
    getAllProblemStatements,
    getProblemStatementById,
    getFilterOptions,
    bookMarkPS,
    deleteBookMark,
    addPsToTeam,
    deletePsFromTeam,
    getTeamProblemStatements,
    getBookmarkedProblemStatements
};
