import pytest
from utils.context import TestContext

@pytest.fixture(scope="session")
def api_context():
    """
    reads the environment, sets up the host, returns context
    """
    setup_config = {
        'host_url': 'http://localhost:3000',
    }
    context = TestContext(setup=setup_config)
    return context

    context.session.close()