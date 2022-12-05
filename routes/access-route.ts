import { NextFunction, Request, Response } from 'express'
import { ProfileList } from './../classes/profile-list'
export class AccessRoute {
    profileList: ProfileList = ProfileList.getInstance()

    accessRoute(app: any, request: any, bodyParser: any): void{
        app.use(bodyParser.json())

        app.route('/api/access/login/').post((req: Request, res: Response, next: NextFunction) => {

            if (req.body){
                const response = this.profileList.login(req.body.email, req.body.password)
                res.send({status: response != undefined ? 200 : 404, data: response, message: response != undefined ? 'registered successfuly' : 'credentials not found'})
            }else{
                res.send({status: 400, message: 'bad request'})
            }
      
        })

        app.route('/api/access/signup/').post((req: Request, res: Response, next: NextFunction) => {

            if (req.body){
                const response = this.profileList.register(req.body)
                res.send({status: response, message: response == 201 ? 'registered successfuly' : 'user already exists'})
            }else{
                res.send({status: 400, message: 'bad request'})
            }
      
        })

        app.route('/api/access/signupgoogle/').post((req: Request, res: Response, next: NextFunction) => {

            if (req.body){
                const response = this.profileList.registerFromGoogle(req.body)
                res.send({status: response, message: response == 201 ? 'registered successfuly' : 'unknown error'})
            }else{
                res.send({status: 400, message: 'bad request'})
            }
      
        })

        app.route('/api/access/profile/').post((req: Request, res: Response, next: NextFunction) => {

            if (req.body){
                const response = this.profileList.findProfileByToken(req.body.token)
                res.send({status: response != undefined ? 200 : 404, data: response, message: response != undefined ? 'registered successfuly' : 'credentials not found'})
            }else{
                res.send({status: 400, message: 'bad request'})
            }
      
        })

    }
}
