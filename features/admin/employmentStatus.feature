Feature: OrangeHRM Admin - Employment Status Management

  As an admin user
  I want to manage employment statuses
  So that I can maintain employee status types in the system

  Background:
    Given I am logged in as admin for employment status

  # ===== NAVIGATION SCENARIOS =====

  Scenario: Navigate to Employment Status page
    When I navigate to Employment Status page
    Then I should see Employment Status page

  Scenario: Open Add Employment Status form
    When I navigate to Employment Status page
    And I click Add button on Employment Status page
    Then I should see Add Employment Status form

  # ===== POSITIVE SCENARIOS =====

  Scenario: Successfully add a new employment status with name
    When I navigate to Add Employment Status page
    And I enter a random employment status name
    And I click Save button on Employment Status form
    Then I should see Employment Status page

  Scenario: Add employment status with specific name
    When I navigate to Add Employment Status page
    And I enter employment status name "Contract Employee"
    And I click Save button on Employment Status form
    Then I should see Employment Status page

  Scenario: Add employment status using complete flow
    When I navigate to Add Employment Status page
    And I add a new employment status with random name
    Then I should see Employment Status page

  # ===== CANCEL SCENARIO =====

  Scenario: Cancel adding a new employment status
    When I navigate to Add Employment Status page
    And I enter a random employment status name
    And I click Cancel button on Employment Status form
    Then I should see Employment Status page

  # ===== NEGATIVE SCENARIOS =====

  Scenario: Cannot save employment status without required field
    When I navigate to Add Employment Status page
    And I click Save button on Employment Status form
    Then I should see validation errors on Employment Status form

  Scenario: Cannot save employment status with empty name field
    When I navigate to Employment Status page
    And I click Add button on Employment Status page
    And I click Save button on Employment Status form
    Then I should see validation errors on Employment Status form

  # ===== DATA-DRIVEN SCENARIOS =====

  Scenario Outline: Add employment statuses with different names
    When I navigate to Add Employment Status page
    And I add a new employment status with name "<name>"
    Then I should see Employment Status page

    Examples:
      | name                    |
      | Full-Time Permanent     |
      | Part-Time Permanent     |
      | Contract                |
      | Temporary               |
      | Intern                  |
      | Probation               |

  # ===== STEP-BY-STEP SCENARIO =====

  Scenario: Add employment status with detailed step verification
    When I navigate to Employment Status page
    Then I should see Employment Status page
    When I click Add button on Employment Status page
    Then I should see Add Employment Status form
    When I enter employment status name "Freelancer"
    And I click Save button on Employment Status form
    Then I should see Employment Status page