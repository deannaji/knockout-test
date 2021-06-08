export interface IProfile {
    name: string
    avatar: string
    organization: string
    title: string 
    phones: string[]
    emails: string[]
    profiles: ISocialProfile[]
}


interface ISocialProfile {
    bio: string
    url: string
    service: string
}