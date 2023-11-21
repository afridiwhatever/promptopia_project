import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia - Share Your Best AI Prompts",
  description:
    "Promptopia let's you save and share your favorite ChatGPT prompts to get things done fast and efficiently! Give it a shot today!",
};

// see if it works without the Provider wrapper
const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
