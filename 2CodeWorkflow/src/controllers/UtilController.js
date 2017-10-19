class UtilController {
  /**
   * @swagger
   * /config/v2/health:
   *   get:
   *     description: |
   *       Health check endpoint for ELB
   *     tags:
   *       - internal
   *     responses:
   *       '200':
   *         examples:
   *           text/plain: Ok
   */
  static async healthCheck(ctx) {
    ctx.ok();
  }
}

module.exports = UtilController;
