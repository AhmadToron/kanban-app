import { fireEvent, render, screen } from '@testing-library/react';
import { TaskCard } from './TaskCard';
import type { Task } from '../types/task';

const task: Task = {
  id: 'abc',
  title: 'Skriva tester',
  description: 'Testa med Jest',
  status: 'todo',
  createdAt: '2026-10-05T12:00:00',
};

describe('TaskCard', () => {
  it('visar titel, beskrivning och datum', () => {
    render(<TaskCard task={task} onMove={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByRole('heading', { name: 'Skriva tester' })).toBeInTheDocument();
    expect(screen.getByText('Testa med Jest')).toBeInTheDocument();
    expect(screen.getByText('Skapad 5 okt 2026')).toBeInTheDocument();
  });

  it('visar ingen bakåt-knapp i första kolumnen', () => {
    render(<TaskCard task={task} onMove={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.queryByRole('button', { name: /till Att göra/ })).not.toBeInTheDocument();
  });

  it('anropar onMove med nästa status när man klickar på pilen', () => {
    const onMove = jest.fn();
    render(<TaskCard task={task} onMove={onMove} onDelete={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Flytta Skriva tester till Pågående' }));

    expect(onMove).toHaveBeenCalledWith('abc', 'in-progress');
  });

  it('anropar onDelete när man klickar på Ta bort', () => {
    const onDelete = jest.fn();
    render(<TaskCard task={task} onMove={jest.fn()} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ta bort Skriva tester' }));

    expect(onDelete).toHaveBeenCalledWith('abc');
  });
});
