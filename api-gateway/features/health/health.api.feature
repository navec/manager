Feature: Get api status

    The purpose of this feature is to get the status of all services

    Rule: Get status of all services if user has rights
        Scenario Outline: Should throw exception when average user asks the health status
            Given an average user
                | username   | email   | rights   |
                | <username> | <email> | <rights> |
            When he calls "/health"
            Then the status is <response_code>
            And the body response is '<response_body>'

            Examples:
                | username | email            | rights | response_code | response_body             |
                # | john Doe | john_doe@fake.fr |        | 403           | Forbidden                 |
                | john Doe | john_doe@fake.fr | admin  | 200           | {"apiGateway": "running"} |