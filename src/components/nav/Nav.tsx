import { useState } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../../style/HeaderSimple.module.css';
import dmmLogo from '/dmm.png'
import { Options } from '../../types/OptionsEnum';

const links = [
  { link: Options.Skills, label: 'Skils' },
  { link: Options.Quests, label: 'Quests' },
];

interface NavProps {
  updateSelection: (selection: Options) => void;
}

const Nav: React.FC<NavProps> = ({ updateSelection }) => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      // href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        updateSelection(link.link)
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <img src={dmmLogo} className={classes.logo} alt="DMM Annihilation" />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} size="md" />
      </Container>
    </header>
  );
}

export default Nav;