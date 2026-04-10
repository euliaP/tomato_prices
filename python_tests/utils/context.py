import requests
from data.api import Endpoints

class TestContext:
    def __init__(self, setup):
        self.host_url = setup['host_url']
        self.session = requests.Session()

    @staticmethod
    def _build_base_url(host, endpoint, query_param=None):
        """
        low-level: just url formatting
        """
        url = f'{host}{endpoint}'
        if query_param:
            url += f'?{query_param}'
        return url

    def _send_request(self, method, url, **kwargs):
        """
        handles connection and timeout tasks
        """
        try:
            response = self.session.request(method, url, timeout=10, **kwargs)
            return response
        except requests.exceptions.RequestException as e:
            print(f"Network call failed: {e}")
            return None

    def build_api_url(self, endpoint, tomato_type=None):
        """
        business logic: maps specific API features to URL
        """
        query_param = f'tomato_type={tomato_type}' if tomato_type else None
        return self._build_base_url(
            host = self.host_url,
            endpoint = endpoint,
            query_param = query_param
        )

    def get_tomato_price(self, tomato_type):
        """
        fetches price data. Unaware of URL syntax or connection handling
        """
        url = self.build_api_url(Endpoints.TOMATO_PRICE, tomato_type)
        response = self._send_request('GET', url)
        return response

    def get_tomato_image(self, tomato_type=None):
        """
        fetches image data. Unaware of URL syntax or connection handling
        """
        url = self.build_api_url(Endpoints.TOMATO_IMAGE, tomato_type)
        response = self._send_request('GET', url)
        return response