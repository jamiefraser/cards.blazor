import { useState } from 'react';
import { CardGameDemo } from './components/CardGameDemo';

export interface User {
  name: string;
  avatar: string;
}

export default function App() {
  return <CardGameDemo />;
}