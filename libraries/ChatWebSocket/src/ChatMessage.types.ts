export type MessageType =
  'server_broadcast' | 'server_information' | 'user_message' | 'user_new_message' |
  'protocol_login' | 'protocol_logout'| 'protocol_register' | 'protocol_response';


export type ProtocolError = 'USERNAME_ALREADY_EXIST' | 'USER_DOES_NOT_EXIST' | 'INTERNAL_ERROR' | 'CANNOT_SEND_MESSAGE';
export type ProtocolMessage = 'CREATED' | 'LOGGED_IN' | 'LOGGED_OUT' | 'CONNECTION_OK' | 'CONNECTION_CLOSED';

interface ChatMessage {
  type: MessageType;
  data: Record<string, string|null>;
}

export interface UserMessage extends ChatMessage {
  type: 'user_message';
  data: {
    username: string;
    message: string;
    time: string;
  };
}

export interface UserNewMessage extends ChatMessage {
  type: 'user_new_message';
  data: {
    user_id: string;
    message: string;
    time: string;
  };
}

export interface ServerBroadCast extends ChatMessage {
  type: 'server_broadcast';
  data: {
    message: string;
    time: string;
  };
}

export interface ServerInformation extends ChatMessage {
  type: 'server_information';
  data: {
    message: string;
    time: string;
  };
}

export interface ProtocolLogin extends ChatMessage {
  type: 'protocol_login';
  data: {
    user_id: string;
  };
}

export interface ProtocolRegister extends ChatMessage {
  type: 'protocol_register';
  data: {
    username: string
  };
}

export interface ProtocolLogout extends ChatMessage {
  type: 'protocol_logout';
  data: {
    user_id: string;
  };
}

export interface ServerProtocol extends ChatMessage {
  type: 'protocol_response';
  data: {
    response: ProtocolMessage | null,
    context: string | null,
    error: ProtocolError | null,
  };
}

export type AnyChatMessage = UserMessage | UserNewMessage | ServerBroadCast | ServerInformation | ProtocolLogin | ProtocolRegister | ProtocolLogout | ServerProtocol;
