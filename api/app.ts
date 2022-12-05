import { AccessRoute } from './../routes/access-route'
import 'reflect-metadata'
import 'module-alias/register'
import express from 'express'
import * as bodyParser from 'body-parser'
import Container from 'typedi'
import { ENV_CONFIG } from '../config'
import { useExpressServer, useContainer as routingContainer } from 'routing-controllers'
import * as http from 'http'
import { UserRoute } from '../routes/user-route'
import * as request from 'request'

const accessRoute: AccessRoute = new AccessRoute()
const userRoute: UserRoute = new UserRoute()

const baseDir = __dirname
const expressApp = express()
import cors from 'cors'

// Handling the DependencyInjection across the entire application
routingContainer(Container)

// Loads all the Controllers from the directories and provides the routing facility
useExpressServer(expressApp, {
  routePrefix: ENV_CONFIG.app.apiRoot,
  defaultErrorHandler: false,
  controllers: [baseDir + `/**/controllers/*{.js,.ts}`]
})

expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use(bodyParser.json())

expressApp.use(cors({
  origin: 'http://localhost:4200'
}))

accessRoute.accessRoute(expressApp, request, bodyParser)
userRoute.userRoute(expressApp, request, bodyParser)

const server = http.createServer(expressApp)
server.listen(ENV_CONFIG.app.port, () => {
  console.log('Server', 'Application running on', `${ENV_CONFIG.app.hostname}:${ENV_CONFIG.app.port}`)
})

// Handling the unHandledRejection errors
process.on('unhandledRejection', (error, promise) => {
    console.log('Server', 'unhandledRejectionError :', `${error}`)
})