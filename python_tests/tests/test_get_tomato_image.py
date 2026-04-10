import pytest
from data.test_data import TomatoTypes, NegativeData
from utils.asserts import Asserts

@pytest.mark.parametrize('tomato_type', [TomatoTypes.CHERRY, TomatoTypes.BIOTOMATO, TomatoTypes.REGULARTOMATO])
def test_get_tomato_image_positive(api_context, tomato_type):
    response = api_context.get_tomato_image(tomato_type)
    Asserts.assert_status_code(response, 200)

@pytest.mark.parametrize('tomato_type', [NegativeData.INVALID_TOMATO_TYPE])
def test_get_tomato_image_negative(api_context, tomato_type):
    response = api_context.get_tomato_image(tomato_type)
    Asserts.assert_status_code(response, 400)