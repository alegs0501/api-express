import { UserList } from '../classes/user-list'
import { NextFunction, Request, Response } from 'express'
import { User } from '../interfaces/user'

export class UserRoute {

    userList: UserList = UserList.getInstance()

    userRoute(app: any, request: any, bodyParser: any): void{
        app.use(bodyParser.json())

        //Get user by id
        app.route('/api/users/:id').get((req: Request, res: Response, next: NextFunction) => {
            
            if (req.params.id){
                const user = this.userList.getUser(Number(req.params.id.replace(/=/g, '')))
                user ? res.send({status: 200, message: 'ok', data: user}) : res.send({status: 404, message: 'user not found'})
            }else{
                res.send({status: 404, message: 'user not found'})
            }

        })

        //Create user
        app.route('/api/users/').post((req: Request, res: Response, next: NextFunction) => {

            if (req.body){
                const response = this.userList.createUser(req.body.name, req.body.email, req.body.job)
                res.send({status: response, message: response == 201 ? 'user created' : 'user already exists'})
            }else{
                res.send({status: 400, message: 'bad request'})
            }
      
        })

        //Update user
        app.route('/api/users/:id').patch((req: Request, res: Response, next: NextFunction) => {

            if (req.body && req.params.id){
                const user: User = {
                    id: Number(req.params.id),
                    name: req.body.name,
                    email: req.body.email,
                    job: req.body.job
                }
                const response = this.userList.updateUser(user)
                let message = 'unknown error'
                switch (response) {
                    case 200:
                        message = 'user updated'
                        break
                    case 400:
                        message = 'bad request'
                        break
                    case 404:
                        message = 'user not found'
                        break
                    default:
                        message = 'unknown error'
                        break
                }
                res.send({status: response, message: message})
            }else{
                res.send({status: 400, message: 'bad request'})
            }
      
        })

        //Get users by page
        app.route('/api/users').get((req: Request, res: Response, next: NextFunction) => {
            
            const elemsPerPage = 5

            if (req.query.page){
                const pages = this.userList.getUsers(Number(req.query.page), elemsPerPage)
                pages ? res.send({status: 200, message: 'ok', data: pages}) : res.send({status: 404, message: 'page not found'})
            }else{
                res.send({status: 404, message: 'page not found'})
            }

        })
    }
    
}
