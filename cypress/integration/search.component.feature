
Feature: Search Component

@e2e
Scenario:
  Given "Cypress" in Search box
  When I removed all text from Search box
  Then the dropdown menu should disappear