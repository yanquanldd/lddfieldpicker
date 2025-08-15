# Field Picker - Microsoft Word Add-in

Field Picker is a Microsoft Word add-in tool that helps legal professionals insert and edit standardized field codes in wills and other legal documents. This repository contains the source code for a custom Office Add-in that appears in the task pane, built using the Yo Office generator framework.

## Overview

The Field Picker add-in provides legal professionals with an efficient way to manage and insert standardized field codes into their documents, streamlining the document creation process for legal workflows.

## Features

Insert, detect, and edit various code types in legal documents:

- **Comment**: `{!comment}`
- **Condition**: `{#condition(if,else,elseif,endif) field operator(optional) customField(optional)}`
- **Loop**: 
  - Without filter: `{#blockType(optional)-limit(optional)-foreach field/customField}`
  - With filter: `{#blockType(optional)-limit(optional)-foreach field/customField|filter:customField}`
- **Print Statement**: 
  - Without filter: `{%field}`
  - With filter: `{%field|formatOption/outputOption}`
- **Include Statement**: `{#include fileName}`

### Usage Instructions

- **Insertion**: Click on the location where you want to insert code, then use the panel to generate the desired code type.
- **Editing**: Click on existing code and use the `Modify code` button in the panel. This will detect the contents and open the edit screen for modification.

## Getting Started

### Prerequisites

- Microsoft Word (desktop or online)
- Node.js and npm (for development)
- Office Add-in development environment

### Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the project: `npm start` (this will open a local Microsoft Word window)

## Usage

1. Open Microsoft Word
2. Load the Field Picker add-in
3. Use the task pane to insert and manage field codes in your legal documents

## Deployment

### Hosting

The Field Picker project is currently hosted at:
- **Repository**: https://github.com/yanquanldd/lddfieldpicker

### Methods to Load the Add-in

#### 1. Side Loading (Recommended for Testing)

**Best for**: Internal testing when users are not in the organization

**Steps**:
1. Open Office on the web
2. Open a document in Excel, OneNote, PowerPoint, or Word
3. Select **Home** > **Add-ins**, then select **More Settings**
4. On the Office Add-ins dialog, select **Upload My Add-in**
5. Browse to the add-in manifest file and select **Upload**
6. Verify installation - the add-in should appear on the ribbon, context menu, or as a task pane

**Reference**: [Sideload Office Add-ins for Testing](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing)

#### 2. Integrated Apps Portal

**Best for**: Organization-wide deployment

The app is currently deployed to the Integrated Apps Portal in the Microsoft 365 admin center for LDD. Assigned users can be managed through the admin portal.

- **Admin Portal**: https://admin.microsoft.com/AdminPortal/Home#/Settings/IntegratedApps
- **Note**: If the add-in fails to load for certain users, use the side loading method as a temporary solution

**Reference**: [Test and Deploy Microsoft 365 Apps](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/test-and-deploy-microsoft-365-apps?view=o365-worldwide)

#### 3. AppSource (Future Deployment)

**Best for**: Public distribution to all users

You can make your add-in available through AppSource, Microsoft's online app store. This method allows for public distribution with or without user authentication.

**Reference**: [Publish Office Add-ins to AppSource](https://learn.microsoft.com/en-us/office/dev/add-ins/publish/publish-office-add-ins-to-appsource)

## Contributing

This project is maintained by the LDD team. For questions or issues, please contact the development team.

## License

[Add license information here]



