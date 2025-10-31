@admin @userManagement
Feature: OrangeHRM Admin - User Management

  As an admin user
  I want to manage system users
  So that I can control access to the system

  Background:
    Given I am logged in as admin

  # ===== POSITIVE SCENARIOS =====
  Scenario: Successfully add a new Admin user
    When I navigate to Add User page
    And I add a new user with random credentials as role "Admin", employee "Peter", status "Enabled"
    Then I should see Admin page

  Scenario: Add user with Disabled status
    When I navigate to Add User page
    And I add a new user with random credentials as role "ESS", employee "Linda", status "Disabled"
    Then I should see Admin page

  # ===== NEGATIVE SCENARIOS =====

  Scenario: Cannot save user without filling any fields
    When I navigate to Add User page
    And I click Save button
    Then I should see validation errors

  Scenario: Cannot save user with only username filled
    When I navigate to Add User page
    And I enter username "testuser123" in user form
    And I click Save button
    Then I should see validation errors

  Scenario: Cannot save user with mismatched passwords
    When I navigate to Add User page
    And I select user role "ESS"
    And I select employee name "Paul"
    And I select status "Enabled"
    And I enter username "testuser456" in user form
    And I enter mismatched passwords
    And I click Save button
    Then I should see password mismatch error

  Scenario: Cannot save user without password
    When I navigate to Add User page
    And I select user role "ESS"
    And I select employee name "Paul"
    And I select status "Enabled"
    And I enter username "testuser789" in user form
    And I click Save button
    Then I should see validation errors

  # ===== CANCEL SCENARIO =====
  
  Scenario: Cancel adding a new user returns to user list
    When I navigate to Add User page
    And I select user role "ESS"
    And I select employee name "Paul"
    And I click Cancel button
    Then I should see Admin page