
export interface TechnologyCreateData {
    name: string,
    image: {
        name: string,
        imageLink: string
    }
}

export interface TechnologyPutData {
    name: string,
    logo: {
        id: string, name: string, imageLink: string
    }
}

export interface ProjectPostData {
    projectName: string
    slug: string
    description: string
    projectLink: string
    githubLink: string
    image: { name: string; imageLink: string }
    technologyIds: string[]
}

export interface AuthenticatedUser {
    id: string,
    username: string,
    token: string
}

export interface UpdateProject {
    projectName?: string;
    slug?: string;
    description?: string;
    projectLink?: string;
    githubLink?: string;
    image?: {
        name?: string;
        imageLink?: string;
    };
}