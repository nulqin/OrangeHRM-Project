Feature: OrangeHRM Admin - Work Shifts Management

  As an admin user
  I want to manage work shifts
  So that I can maintain shift schedules in the system

  Background:
    Given I am logged in as admin for work shifts

  # ===== NAVIGATION SCENARIOS =====

  Scenario: Navigate to Work Shifts page
    When I navigate to Work Shifts page
    Then I should see Work Shifts page

  Scenario: Open Add Work Shift form
    When I navigate to Work Shifts page
    And I click Add button on Work Shifts page
    Then I should see Add Work Shift form

  # ===== POSITIVE SCENARIOS =====

  Scenario: Successfully add a new work shift with name
    When I navigate to Add Work Shift page
    And I enter a random work shift name
    And I click Save button on Work Shift form
    Then I should see Work Shifts page

  Scenario: Add work shift with specific name
    When I navigate to Add Work Shift page
    And I enter work shift name "Night Shift"
    And I click Save button on Work Shift form
    Then I should see Work Shifts page

  Scenario: Add work shift using complete flow
    When I navigate to Add Work Shift page
    And I add a new work shift with random name
    Then I should see Work Shifts page

  # ===== CANCEL SCENARIO =====

  Scenario: Cancel adding a new work shift
    When I navigate to Add Work Shift page
    And I enter a random work shift name
    And I click Cancel button on Work Shift form
    Then I should see Work Shifts page

  # ===== NEGATIVE SCENARIOS =====

  Scenario: Cannot save work shift without required field
    When I navigate to Add Work Shift page
    And I click Save button on Work Shift form
    Then I should see validation errors on Work Shift form

  Scenario: Cannot save work shift with empty name field
    When I navigate to Work Shifts page
    And I click Add button on Work Shifts page
    And I click Save button on Work Shift form
    Then I should see validation errors on Work Shift form

  # ===== DATA-DRIVEN SCENARIOS =====

  Scenario Outline: Add work shifts with different names
    When I navigate to Add Work Shift page
    And I add a new work shift with name "<name>"
    Then I should see Work Shifts page

    Examples:
      | name              |
      | Morning Shift     |
      | Afternoon Shift   |
      | Evening Shift     |
      | Night Shift       |
      | Weekend Shift     |
      | Holiday Shift     |
      | Flexible Shift    |

  # ===== STEP-BY-STEP SCENARIO =====

  Scenario: Add work shift with detailed step verification
    When I navigate to Work Shifts page
    Then I should see Work Shifts page
    When I click Add button on Work Shifts page
    Then I should see Add Work Shift form
    When I enter work shift name "Rotating Shift"
    And I click Save button on Work Shift form
    Then I should see Work Shifts page