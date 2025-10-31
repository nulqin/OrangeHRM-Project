@forgotPassword @regression
Feature: OrangeHRM Forgot Password Functionality

  As a user of OrangeHRM
  I want to be able to reset my password
  So that I can regain access to my account

  Background:
    Given I am on the OrangeHRM login page for password reset

  Scenario: Navigate to Forgot Password page
    When I click on Forgot your password link
    Then I should see the Reset Password page

  Scenario: Successfully request password reset
    When I click on Forgot your password link
    And I enter username "Admin" for password reset
    And I click on Reset Password button
    Then I should see a password reset success message

  Scenario: Cancel password reset and return to login
    When I click on Forgot your password link
    And I should see the Reset Password page
    And I click on Cancel button
    Then I should be redirected back to login page

  Scenario Outline: Request password reset with different usernames
    When I click on Forgot your password link
    And I enter username "<username>" for password reset
    And I click on Reset Password button
    Then I should see a password reset success message

    Examples:
      | username  |
      | Admin     |
      | testuser  |