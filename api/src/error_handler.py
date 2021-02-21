

class MinizincException(Exception):
    status_code = 400

    def __init__(self, message, payload=None):
        Exception.__init__(self)
        self.payload = payload
        self.message = message

    def error_msg(self):
        error = dict(self.payload or ())
        error['message'] = self.message #.split('\n')[0] + '\n' + self.message.split('\n')[2]

        return error
