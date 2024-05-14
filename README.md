# KanBan Style React App


## Description:
The project was created for Chas fjsx23 class.


### Features 
- Drag-and-Drop Interface: Utilizes the @dnd-kit library for smooth and intuitive task and column reordering.
- Column Management: Users can create, delete, and rename columns to tailor the board to their workflow.
- Task Management: Tasks can be created, edited, and deleted within columns. Each task includes a title, date, and content.
- Modal Editing: Modal windows provide an interface for editing task details, including title and content. 
-Routing: Implements React Router for navigation between board, column, and task pages.

### Project Structure
- Components
    - Board: The main component that renders the Kanban board layout and manages column and task data.
    - Column: Renders individual columns on the board, including task cards and column management functions.
    - Card: Represents individual task cards within columns, with options for editing and deletion.
    - Modal: Provides a modal interface for editing task details.
    - Header: Renders a simple header for the application.
- Pages
    - FullColPage: Displays the contents of a single column with its associated tasks.
    - CardPage: Displays detailed information about a single task.
- Context 
    - DataContext: Manages the global state of columns, cards, and textarea contents using React context.


### Dependencies 
- React
- @dnd-kit/core for drag and drop 
- react-icons
- react-router-dom
- Tailwind for styling


## Usage
To deploy website locally:
1. Clone this repository.
2. Install dependencies by running npm install.
3. Start server by running npm run dev. 
4. Access application!


You may also view the website via Netlify:





## Contact Information:


Email: jumistrandberg@gmail.com

