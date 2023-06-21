Feature: delete company.

    # Scenario Outline: Try to delete company with invalid details.
    #     Given Company details id: "<id>"
    #     When Try to delete company
    #     Then It will throw error: "<error>" with message: "<message>" while deleting company
        
    #     Examples:
    #     | id   | error             | message                            | 
    #     |      | ValidationError   | '"id" is not allowed to be empty'  |

    Scenario Outline: Try to delete company with valid details.
        Given Company details id: "<id>"
        When Try to delete company
        Then It will delete company with details: "<deletedCompanyDetails>"
        
        Examples:
        | id   | deletedCompanyDetails |
        | 1    | '1'                   |


        
