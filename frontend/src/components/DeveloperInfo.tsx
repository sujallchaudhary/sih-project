import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const DeveloperCard = ({ 
  name, 
  role, 
  description, 
  github, 
  linkedin, 
  email,
  imageUrl 
}: {
  name: string;
  role: string;
  description: string;
  github?: string;
  linkedin?: string;
  email?: string;
  imageUrl?: string;
}) => (
  <Card className="h-full bg-white border border-gray-200">
    <CardHeader>
      <div className="w-24 h-24 mx-auto mb-4 relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-full object-cover border-4 border-orange-200"
          />
        ) : (
          <div className="bg-blue-600 rounded-full p-4 w-full h-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <CardTitle className="text-center text-gray-900">{name}</CardTitle>
      <CardDescription className="text-center font-medium text-blue-600">{role}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      <div className="flex justify-center space-x-3">
        {github && (
          <Button variant="outline" size="sm" asChild>
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        )}
        {linkedin && (
          <Button variant="outline" size="sm" asChild>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        )}
        {email && (
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${email}`}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

const DeveloperInfo = () => {
  const developer = {
    name: "Sujal Chaudhary",
    role: "Full Stack Developer",
    description: "I build, deploy, and maintain SIHconnect as an individual developer. Passionate about real-world impact and open source.",
    github: "https://sujal.info/github",
    linkedin: "https://sujal.info/linkedin",
    email: "sujalchaudhary63@gmail.com",
    imageUrl: "https://hajiriresource.blob.core.windows.net/drive/6855a16b063f65d55faa775e/1752554978012-1736037022825_1752554978012_wua8ud.jpeg"
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet the Developer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SIHconnect is built and maintained by a single developer who loves building useful, accessible hackathon tools for everyone.
          </p>
        </div>
        <div className="flex justify-center">
          <DeveloperCard
            name={developer.name}
            role={developer.role}
            description={developer.description}
            github={developer.github}
            linkedin={developer.linkedin}
            email={developer.email}
            imageUrl={developer.imageUrl}
          />
        </div>
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Open Source & Contributions</h3>
            <p className="text-gray-600 mb-6">
              This project is open source and welcomes contributions from the community. 
              Help make SIHconnect even better!
            </p>
            <Button asChild>
              <a href="https://github.com/sujallchaudhary/sih-project" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperInfo;
