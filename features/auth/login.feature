@login @smoke
Feature: OrangeHRM Login Functionality

  As a user of OrangeHRM
  I want to be able to login
  So that I can access the system

  Background:
    Given I am on the OrangeHRM login page

  Scenario: Successful login with valid credentials
    When I enter username "Admin"
    And I enter password "admin123"
    And I click on the login button
    Then I should see the dashboard page

  Scenario: Login with valid credentials using single step
    When I login with username "Admin" and password "admin123"
    Then I should see the dashboard page

  Scenario: Unsuccessful login with invalid credentials
    When I enter username "InvalidUser"
    And I enter password "InvalidPass"
    And I click on the login button
    Then I should see an error message

  Scenario Outline: Login with multiple credentials
    When I login with username "<username>" and password "<password>"
    Then I should see <result>

    Examples:
      | username    | password   | result                  |
      | Admin       | admin123   | the dashboard page      |
      | InvalidUser | admin123   | an error message        |
      | Admin       | wrongpass  | an error message        |