Feature: check company by name.

  Scenario Outline: Try to check company by name with invalid details.
    Given Company details name: "<name>"
    When Try to check company by name
    Then It will throw error: "<error>" with message: "<message>" while checking company by name company
    
    Examples:
      | name | error             | message                              | 
      |      | ValidationError   | '"name" is not allowed to be empty'  |

  Scenario Outline: Try to check company by name with valid details.
    Given Company details name: "<name>"
    When Try to check company by name
    Then It will give companyList: "<companyList>" after checking company by name
    
    Examples:
    | name | companyList        | 
    | abc  | "[{'id':abc}]"     |
        
