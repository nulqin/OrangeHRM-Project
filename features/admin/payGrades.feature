@admin @payGrades
Feature: OrangeHRM Admin - Pay Grades Management

  As an admin user
  I want to manage pay grades
  So that I can maintain salary grade information in the system

  Background:
    Given I am logged in as admin for pay grades

  # ===== NAVIGATION SCENARIOS =====

  Scenario: Navigate to Pay Grades page
    When I navigate to Pay Grades page
    Then I should see Pay Grades page

  Scenario: Open Add Pay Grade form
    When I navigate to Pay Grades page
    And I click Add button on Pay Grades page
    Then I should see Add Pay Grade form

  # ===== POSITIVE SCENARIOS =====

  Scenario: Successfully add a new pay grade with name
    When I navigate to Add Pay Grade page
    And I enter a random pay grade name
    And I click Save button on Pay Grade form
    Then I should see Pay Grades page

  Scenario: Add pay grade with specific name
    When I navigate to Add Pay Grade page
    And I enter pay grade name "Grade A - Senior Level"
    And I click Save button on Pay Grade form
    Then I should see Pay Grades page

  Scenario: Add pay grade using complete flow
    When I navigate to Add Pay Grade page
    And I add a new pay grade with random name
    Then I should see Pay Grades page

  # ===== CANCEL SCENARIO =====

  Scenario: Cancel adding a new pay grade
    When I navigate to Add Pay Grade page
    And I enter a random pay grade name
    And I click Cancel button on Pay Grade form
    Then I should see Pay Grades page

  # ===== NEGATIVE SCENARIOS =====

  Scenario: Cannot save pay grade without required field
    When I navigate to Add Pay Grade page
    And I click Save button on Pay Grade form
    Then I should see validation errors on Pay Grade form

  Scenario: Cannot save pay grade with empty name field
    When I navigate to Pay Grades page
    And I click Add button on Pay Grades page
    And I click Save button on Pay Grade form
    Then I should see validation errors on Pay Grade form

  # ===== DATA-DRIVEN SCENARIOS =====

  Scenario Outline: Add pay grades with different names
    When I navigate to Add Pay Grade page
    And I add a new pay grade with name "<name>"
    Then I should see Pay Grades page

    Examples:
      | name                    |
      | Grade 1 - Entry Level   |
      | Grade 2 - Junior Level  |
      | Grade 3 - Mid Level     |
      | Grade 4 - Senior Level  |
      | Grade 5 - Executive     |

  # ===== STEP-BY-STEP SCENARIO =====

  Scenario: Add pay grade with detailed step verification
    When I navigate to Pay Grades page
    Then I should see Pay Grades page
    When I click Add button on Pay Grades page
    Then I should see Add Pay Grade form
    When I enter pay grade name "Test Grade - Automation"
    And I click Save button on Pay Grade form
    Then I should see Pay Grades page