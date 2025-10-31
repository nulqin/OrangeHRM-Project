@admin @jobTitles
Feature: OrangeHRM Admin - Job Titles Management

  As an admin user
  I want to manage job titles
  So that I can maintain job title information in the system

  Background:
    Given I am logged in as admin for job titles

  # ===== NAVIGATION SCENARIOS =====

  Scenario: Navigate to Job Titles page
    When I navigate to Job Titles page
    Then I should see Job Titles page

  Scenario: Open Add Job Title form
    When I navigate to Job Titles page
    And I click Add button on Job Titles page
    Then I should see Add Job Title form

  # ===== POSITIVE SCENARIOS =====

  Scenario: Successfully add a new job title with all fields
    When I navigate to Add Job Title page
    And I enter a random job title
    And I enter job description "This is a test job description for automation testing"
    And I enter note "This job title was created by automation test"
    And I click Save button on Job Title form
    Then I should see Job Titles page

  Scenario: Add job title with specific data
    When I navigate to Add Job Title page
    And I add a new job title with random data
    Then I should see Job Titles page

  Scenario: Add job title with only required field
    When I navigate to Add Job Title page
    And I enter a random job title
    And I click Save button on Job Title form
    Then I should see Job Titles page

  # ===== CANCEL SCENARIO =====

  Scenario: Cancel adding a new job title
    When I navigate to Add Job Title page
    And I enter a random job title
    And I click Cancel button on Job Title form
    Then I should see Job Titles page

  # ===== NEGATIVE SCENARIOS =====

  Scenario: Cannot save job title without required field
    When I navigate to Add Job Title page
    And I click Save button on Job Title form
    Then I should see validation errors on Job Title form

  Scenario: Cannot save job title with only description
    When I navigate to Add Job Title page
    And I enter job description "Only description without job title"
    And I click Save button on Job Title form
    Then I should see validation errors on Job Title form

  Scenario: Cannot save job title with only note
    When I navigate to Add Job Title page
    And I enter note "Only note without job title"
    And I click Save button on Job Title form
    Then I should see validation errors on Job Title form

  # ===== DATA-DRIVEN SCENARIOS =====

  Scenario Outline: Add job titles with different data
    When I navigate to Add Job Title page
    And I add a new job title with title "<title>", description "<description>", and note "<note>"
    Then I should see Job Titles page

    Examples:
      | title                  | description                           | note                    |
      | Senior Software Engineer | Responsible for complex development  | Tech leadership role   |
      | QA Automation Lead     | Lead automation testing initiatives   | Quality assurance role |
      | DevOps Engineer        | Manage CI/CD and infrastructure       | Operations role        |
      | Product Manager        | Define product strategy and roadmap   | Management role        |