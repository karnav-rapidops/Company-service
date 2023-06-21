Feature: Create New Company.

  Scenario Outline: Try to create new company with invalid details, then it will throw error.
    Given Company details name: "<name>", email: "<email>" , address: "<address>" , estYear: "<estyear>" , type: "<type>" to create new company
    When Try to create new company
    Then It will throw error: "<error>" with message: "<message>" while creating new company
    
    Examples:
      | name     | email              | address   | estyear  | type | error              | message                  | 
      |          | karnav@gmail.com   | Ahmedabad | 2008     | IT   | ValidationError    | '"name" is required'    |
      | Rapidops |                    | Ahmedabad | 2008     | IT   | ValidationError    | '"email" is required'    |                 
      | Rapidops | karnav@gmail.com   |           | 2008     | IT   | ValidationError    | '"address" is required'  |      
      | Rapidops | karnav@gmail.com   | Ahmedabad |          | IT   | ValidationError    | '"estYear" is required'  |  
      | Rapidops | karnav@gmail.com   | Ahmedabad | 2008     |      | ValidationError    | '"type" is required'     |  

  Scenario Outline: Try to create new company with valid details, then it will create new company.
    Given Company details name: "<name>", email: "<email>" , address: "<address>" , estYear: "<estYear>" , type: "<type>" to create new company
    When Try to create new company
    Then It will create new company with details: "<newCompanyDetails>"

    Examples:
      | name      | email              | address   | estYear  | type | newCompanyDetails | 
      | Rapidops  | karnav@gmail.com   | Ahmedabad | 2008     | IT   | '123'             |  
      
