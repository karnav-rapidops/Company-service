Feature: Get company id by company name.

    Scenario Outline: Try to get company id by name with invalid details
        Given Company details name: "<name>" to get company id
        When Try to get company id by name
        Then It will give error: "<error>" with message: "<message>"
        
        Examples:
        | name   | id | error           | message                            |
        |        | '1'| ValidationError | '"name" is not allowed to be empty' |
  

    Scenario Outline: Try to get company id by name with valid details 
        Given Company details name: "<name>" to get company id
        When Try to get company id by name
        Then It will give company id: "<id>"
        
        Examples:
        | name   | id |
        | abc    | '1'|


        
