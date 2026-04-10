from requests import Response

class Asserts:
    @staticmethod
    def assert_status_code(actual_response: Response, expected_status_code: int):
        actual_status_code = actual_response.status_code
        assert actual_status_code == expected_status_code, (
            f'Unexpected response status code. Expected: {expected_status_code}'
            f'Actual status code: {actual_status_code}'
        )