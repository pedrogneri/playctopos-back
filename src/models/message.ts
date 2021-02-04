export interface Message {
  username?: string,
  color?: string,
  value: string,
  type: 'warn' | 'message',
}
