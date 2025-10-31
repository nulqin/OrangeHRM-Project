Feature: OrangeHRM Admin - Job Categories Management

  As an admin user
  I want to manage job categories
  So that I can maintain job categorization in the system

  Background:
    Given I am logged in as admin for job categories

  # ===== NAVIGATION SCENARIOS =====

  Scenario: Navigate to Job Categories page
    When I navigate to Job Categories page
    Then I should see Job Categories page

  Scenario: Open Add Job Category form
    When I navigate to Job Categories page
    And I click Add button on Job Categories page
    Then I should see Add Job Category form

  # ===== POSITIVE SCENARIOS =====

  Scenario: Successfully add a new job category with name
    When I navigate to Add Job Category page
    And I enter a random job category name
    And I click Save button on Job Category form
    Then I should see Job Categories page

  Scenario: Add job category with specific name
    When I navigate to Add Job Category page
    And I enter job category name "Technical Support"
    And I click Save button on Job Category form
    Then I should see Job Categories page

  Scenario: Add job category using complete flow
    When I navigate to Add Job Category page
    And I add a new job category with random name
    Then I should see Job Categories page

  # ===== CANCEL SCENARIO =====

  Scenario: Cancel adding a new job category
    When I navigate to Add Job Category page
    And I enter a random job category name
    And I click Cancel button on Job Category form
    Then I should see Job Categories page

  # ===== NEGATIVE SCENARIOS =====

  Scenario: Cannot save job category without required field
    When I navigate to Add Job Category page
    And I click Save button on Job Category form
    Then I should see validation errors on Job Category form

  Scenario: Cannot save job category with empty name field
    When I navigate to Job Categories page
    And I click Add button on Job Categories page
    And I click Save button on Job Category form
    Then I should see validation errors on Job Category form

  # ===== DATA-DRIVEN SCENARIOS =====

  Scenario Outline: Add job categories with different names
    When I navigate to Add Job Category page
    And I add a new job category with name "<name>"
    Then I should see Job Categories page

    Examples:
      | name                  |
      | Software Development  |
      | Quality Assurance     |
      | Business Analysis     |
      | Project Management    |
      | Sales & Marketing     |
      | Human Resources       |
      | Customer Support      |

  # ===== STEP-BY-STEP SCENARIO =====

  Scenario: Add job category with detailed step verification
    When I navigate to Job Categories page
    Then I should see Job Categories page
    When I click Add button on Job Categories page
    Then I should see Add Job Category form
    When I enter job category name "Operations"
    And I click Save button on Job Category form
    Then I should see Job Categories page