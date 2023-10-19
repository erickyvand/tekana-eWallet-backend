/**
 * Auth controller class
 */
class AuthController {
  /**
   * * Registration
   * @param  {object} req
   * @param  {object} res
   * @returns {object} object
   */
  static async register(req, res) {
    res.send('register');
  }

  /**
   * * Login
   * @param  {object} req
   * @param  {object} res
   * @returns {object} object
   */
  static async login(req, res) {
    res.send('login');
  }
}

export default AuthController;
