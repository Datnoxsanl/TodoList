import TaskList from "@/Component/TaskList";
import BaseLayout from "@/Component/Layout/BaseLayout";

export default function Home(){

    return(
        <>
        <section className="lists-container">
          <TaskList title="Danh sách việc cần làm" />
          <div className="list">
          <h3 className="list-title">Completed Tasks</h3>
          <ul className="list-items">
            <li>Clear email inbox</li>
            <li>Finalise requirements for client web design</li>
            <li>Begin work on mock-up for client website</li>
          </ul>
          <button className="add-card-btn btn">Add a card</button>
        </div>
        <div className="list">
          <h3 className="list-title">Topics/Concepts to Revise</h3>
          <ul className="list-items">
            <li>HTML Elements</li>
            <li>HTML Form Validation</li>
            <li>HTML Structured Data</li>
            <li>Advanced CSS Selectors</li>
            <li>CSS Transforms</li>
            <li>CSS Animations</li>
            <li>CSS Flexbox</li>
            <li>CSS Grid</li>
            <li>CSS Methodologies (BEM, SMACSS etc.)</li>
            <li>SASS/SCSS</li>
            <li>Layout Fallbacks</li>
            <li>Responsive Design</li>
            <li>Design Patterns</li>
            <li>JavaScript Fundamentals</li>
            <li>JavaScript OOP</li>
            <li>JavaScript DOM Manipulation</li>
            <li>JavaScript Debugging Techniques</li>
            <li>Node Package Manager</li>
            <li>Grunt/Gulp</li>
            <li>GitHub</li>
            <li>Git Commands</li>
            <li>Web Accessibility</li>
            <li>Web Performance</li>
            <li>Web Hosting</li>
            <li>Browser Dev Tools</li>
            <li>Google Analytics</li>
            <li>Basic Photoshop/Sketch Usage</li>
          </ul>
          <button className="add-card-btn btn">Add a card</button>
        </div>
        <div className="list">
          <h3 className="list-title">Topics/Concepts to Learn</h3>
          <ul className="list-items">
            <li>HTML 5.2 New Features</li>
            <li>Responsive Images (picture element, srcset/sizes etc.)</li>
            <li>Serverless</li>
            <li>Variable Fonts</li>
            <li>Shadow DOM</li>
            <li>ES6+</li>
            <li>JSON & AJAX</li>
            <li>API's</li>
            <li>JavaScript Patterns</li>
            <li>JavaScript Testing</li>
            <li>jQuery</li>
            <li>SVG</li>
            <li>React JS</li>
            <li>Angular JS</li>
            <li>TypeScript</li>
            <li>Vue JS</li>
            <li>Node JS</li>
            <li>Webpack</li>
            <li>SEO Techniques</li>
            <li>HTML Emails</li>
            <li>WordPress</li>
            <li>Static Site Generators (Jekyll, Hugo, Gatsby etc.)</li>
          </ul>
          <button className="add-card-btn btn">Add a card</button>
        </div>
        <div className="list">
          <h3 className="list-title">Useful Websites for Learning</h3>
          <ul className="list-items">
            <li>Code Academy</li>
            <li>CodePen</li>
            <li>Codrops</li>
            <li>CSS-Tricks</li>
            <li>Free Code Camp</li>
            <li>Khan Academy</li>
            <li>Lynda</li>
            <li>Medium</li>
            <li>Mozilla Developer Network</li>
            <li>Stack Overflow</li>
            <li>Team Treehouse</li>
            <li>Tuts Plus</li>
            <li>Udemy</li>
            <li>WPSessions</li>
            <li>YouTube</li>
          </ul>
          <button className="add-card-btn btn">Add a card</button>
        </div>
        <div className="list">
          <h3 className="list-title">Web Dev YouTube Channels</h3>
          <ul className="list-items">
            <li>Adam Khoury</li>
            <li>Brad Hussey</li>
            <li>CSS-Tricks (Chris Coyier)</li>
            <li>Derek Banas</li>
            <li>DevTips (Travis Neilson)</li>
            <li>Free Code Camp</li>
            <li>Fun Fun Function (Mattias Petter Johansson)</li>
            <li>Google Chrome Developers</li>
            <li>Layout Land (Jen Simmons)</li>
            <li>Learn Code Academy</li>
            <li>Level Up Tuts (Scott Tolinski)</li>
            <li>Mackenzie Child</li>
            <li>Rachel Andrew</li>
            <li>The Net Ninja (Shaun Pelling)</li>
            <li>The New Boston (Bucky Roberts)</li>
            <li>Traversy Media (Brad Traversy)</li>
            <li>Wes Bos</li>
          </ul>
          <button className="add-card-btn btn">Add a card</button>
        </div>
        <div className="list">
          <h3 className="list-title">CodePen Ideas</h3>
          <ul className="list-items">
            <li>Something cool with CSS Grid</li>
            <li>Something cool with CSS Flexbox</li>
            <li>Something cool with CSS animations</li>
            <li>Something cool with CSS gradients</li>
            <li>Something cool with CSS pseudo-elements</li>
            <li>Something cool with SVG</li>
            <li>Something cool with JavaScript</li>
            <li>Something cool with all of the above</li>
          </ul>
          <button className="add-card-btn btn">Add a card</button>
        </div>
        <div className="list">
          <h3 className="list-title">Practise Website Ideas</h3>
          <ul className="list-items">
            <li>Airsoft/Paintballing Centre</li>
            <li>Bar/Pub</li>
            <li>Bicycle Shop/Repair</li>
            <li>Cafe/Coffee Shop</li>
            <li>Car Showroom/Garage/Repair/Parts</li>
            <li>Construction Company</li>
            <li>Fitness/Gym/Leisure Centre</li>
            <li>Nightclub</li>
            <li>Party Planning Company</li>
            <li>PC Build/Repair Service</li>
            <li>Portfolio/CV</li>
            <li>Real Estate/AirBnB</li>
            <li>Restaurant</li>
            <li>Skiing/Snowboarding Centre/Company</li>
            <li>Streaming Service for Movies/TV</li>
            <li>Streaming Service for Video Games</li>
            <li>Taxi Service</li>
            <li>Travel Agency</li>
            <li>Zoo/Safari Park</li>
          </ul>
          <button className="add-card-btn btn">Add a card</button>
        </div>
        <div className="list">
          <h3 className="list-title">JavaScript Project Ideas</h3>
          <ul className="list-items">
            <li>Analog Clock</li>
            <li>Basic Quiz</li>
            <li>Bill/Cost Splitter</li>
            <li>Countdown Timer</li>
            <li>Form Validator</li>
            <li>Geolocation (Find places near you etc.)</li>
            <li>Gif Search</li>
            <li>Note Taking App</li>
            <li>Random Name Picker</li>
            <li>Secret Message Encoder/Decoder</li>
            <li>Sortable Image Gallery</li>
            <li>Sortable Table</li>
            <li>Tip Calculator</li>
            <li>To-Do List</li>
            <li>Unit Converter</li>
          </ul>
          <button className="add-card-btn btn">Add a card</button>
        </div>
          <button className="add-list-btn btn">Add a list</button>
        </section>
        </>
    )
}