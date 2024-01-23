
import '@styles/globals.css';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import Image from 'next/image';


export const metadata = {
  title: "Human-Generated Prompts",
  description: "Discover & Share Human-Generated Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='relative app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;