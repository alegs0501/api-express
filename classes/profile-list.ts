import { User } from './../interfaces/user'
import { Profile } from './../interfaces/profile'
export class ProfileList {

    profiles: Profile[] = []

    private static instance: ProfileList

    private constructor() { }

    public static getInstance(): ProfileList {
        if (!ProfileList.instance) {
            ProfileList.instance = new ProfileList()
        }

        return ProfileList.instance
    }

    findProfileByEmail(email: string): Profile | undefined {
        let user: Profile | undefined = undefined
        const users = this.profiles.filter(p => p.email == email)
        if (users.length > 0) user = users[0]
        return user
    }

    findProfileByToken(token: string): Profile | undefined {
        let user: Profile | undefined = undefined
        const users = this.profiles.filter(p => p.idToken == token)
        if (users.length > 0) user = users[0]
        return user
    }

    login(email: string, password: string): Profile | undefined{
        let user: Profile | undefined = undefined
        const found = this.profiles.filter(p => p.email == email && p.password == password)
        if (found.length > 0) {
          user = found[0]  
        }      
        return user
    }

    profileExists(profile: Profile): boolean{
        let exists = false
        const users = this.profiles.filter(p => p.email == profile.email)
        if (users.length > 0) exists = true
        return exists
    }


    register(profile: Profile): number{
        let code = 200
        profile.idToken = `${new Date().getTime()}${Math.random() * 999999}`
        const exists = this.profileExists(profile)
        if (!exists){
            const user = profile
            user.id = this.profiles.length + 1
            this.profiles.push(user)
            code = 201
        }else{
            code = 400
        }
        return code
    }

    registerFromGoogle(profile: Profile): number{
        let code = 200
        const exists = this.profiles.indexOf(profile)
        if (exists < 0){
            const user = profile
            user.id = this.profiles.length + 1
            this.profiles.push(user)
            code = 201
        }else{
            this.profiles[exists] = profile
        }
        return code
    }
}
