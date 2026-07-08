/**
 * Standardized success response shape sent to clients.
 * Keeps every endpoint's response envelope consistent:
 * { success, message, data }
 */
class ApiResponse {
  constructor(statusCode, message = 'Success', data = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = ApiResponse;
