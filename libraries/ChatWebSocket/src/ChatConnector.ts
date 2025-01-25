import type { AnyChatMessage } from './ChatMessage.types'
import { WSChatConnectorMessage } from './ChatMessage'

export class WSChatConnector {
  #websocket: WebSocket;
  public onmessage: (message: WSChatConnectorMessage) => void = ()=>{};
  public onopen: (event: WSChatConnectorMessage) => void = ()=>{};
  public onerror: (error: WSChatConnectorMessage) => void = ()=>{};
  public onclose: (event: WSChatConnectorMessage) => void = ()=>{};

  private constructor(url: string) {
    this.#websocket = new WebSocket(url);
  }

  public static createInstance(url: string): WSChatConnector {
    const chatSocket = new WSChatConnector(url);

    chatSocket.#websocket.onmessage = (event) => {
      const message = WSChatConnectorMessage.parse(event.data);
      chatSocket.onmessage(message);
    }
    chatSocket.#websocket.onopen = (event) => {
      chatSocket.onopen(WSChatConnectorMessage.create('protocol_response', { response: 'CONNECTION_OK', error: null, context: null }));
    }
    chatSocket.#websocket.onerror = (event) => {
      chatSocket.onerror(WSChatConnectorMessage.create('protocol_response', { response: null, error: 'INTERNAL_ERROR', context: null }));
    }
    chatSocket.#websocket.onclose = (event) => {
      chatSocket.onclose(WSChatConnectorMessage.create('protocol_response', { response: 'CONNECTION_CLOSED', error: null, context: null }));
    }

    return chatSocket;
  }

  public send(message: AnyChatMessage): void {
    this.#websocket.send(WSChatConnectorMessage.stringify(message));
  }
  public close(): void {
    this.#websocket.close();
  }
}
