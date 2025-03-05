import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { useState, Fragment } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

import {
  darcula,
  okaidia,
  coy,
  tomorrow,
  solarizedlight,
  materialDark,
  materialLight,
  dracula,
  nightOwl,
  atomDark,
  vs,
  vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

const people = [
  { sty: atomDark, name: 'atomDark' },
  { sty: darcula, name: 'darcula' },
  { sty: okaidia, name: 'okaidia' },
  { sty: coy, name: 'coy' },
  { sty: tomorrow, name: 'tomorrow' },
  { sty: solarizedlight, name: 'solarizedlight' },
  { sty: materialDark, name: 'materialDark' },
  { sty: materialLight, name: 'materialLight' },
  { sty: dracula, name: 'dracula' },
  { sty: nightOwl, name: 'nightOwl' },
  { sty: vs, name: 'vs' },
  { sty: vscDarkPlus, name: 'vscDarkPlus' },
];

function Example({selected, setSelected}) {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="mx-auto h-screen bg-black w-52 pt-20">
      <Combobox value={selected} onChange={(value) => setSelected(people.filter((person) => person.name === value))} onClose={() => setQuery('')}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            displayValue={(person) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.name}
              value={person}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{person.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}

const CodeDisplay = ({ code }) => {
    const [selected, setSelected] = useState(people[0]);
    const [Idx, setIdx] = useState(0);

    return (
      <div>
        <select value={Idx} onChange={(e) => {
          setIdx(e.target.value);
          setSelected(people[e.target.value]);
        }
        }>
          {people.map((person, idx) => (
            <option key={idx} value={idx}>
              {person.name}
            </option>
          ))}
        </select>
        {/* <Example selected={selected} setSelected={setSelected} /> */}
          <SyntaxHighlighter wrapLines={true} showLineNumbers={true} className="max-w-[700px] min-h-96 rounded-md" language="javascript" style={selected.sty}>
            {code}
          </SyntaxHighlighter>
      </div>
    );
  };

function App() {
  const [name, setName] = useState('hello World');

  const jsCode = `
  // JavaScript code examplebbb
  
  const sendEmail = (name) => {
    emailjs.send('service_123', 'template_123', {emailjs.send('service_123', 'template_123', {emailjs.send('service_123', 'template_123', {emailjs.send('service_123', 'template_123', {
          name: name,
        });
      }

      const form = {
        name: '${name}',
        email: '${name}@gmail.com',
        subject: 'Hello ${name}',
        message: 'Hello ${name}, how are you?',
      };
      sendEmail(form);
    `;
  return (
    <div>
      <CodeDisplay code={jsCode} />
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

export default App;