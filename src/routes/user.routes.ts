import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import UserController from '../controller/UserController';
import {
  validateLogin,
  validateSetId,
  validateUserCreate,
  validateUserUpdate,
} from '../middleware/celebrate.middleware';

const userRouter = express.Router();

userRouter.route('/').post(validateUserCreate(), UserController.create);

userRouter
  .route('/')
  .get(
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    UserController.findAll
  );

userRouter
  .route('/:id')
  .get(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    UserController.findOne
  );

userRouter
  .route('/')
  .put(validateUserUpdate(), authenticateMiddleware, UserController.update);

userRouter
  .route('/:id')
  .delete(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    UserController.delete
  );

userRouter
  .route('/detail/me')
  .get(authenticateMiddleware, UserController.detail);

userRouter.route('/login').post(validateLogin(), UserController.login);

export default userRouter;
