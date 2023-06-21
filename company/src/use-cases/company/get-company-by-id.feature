Feature: Get company details.

    Scenario Outline: Try to delete company with invalid details.
        Given Company details id: "<id>"
        When Try to delete company
        Then It will throw error: "<error>" with message: "<message>" while deleting company
        
        Examples:
        | id   | error             | message                            | 
        |      | ValidationError   | '"id" is not allowed to be empty'  |

    Scenario Outline: Try to get company details with valid details.
        Given Company details id: "<id>" to get company details
        When Try to get company details
        Then It will give company details: "<companyDetails>"
        
        Examples:
        | id   | companyDetails |
        | 1    | '{"id":123}'  |


        
