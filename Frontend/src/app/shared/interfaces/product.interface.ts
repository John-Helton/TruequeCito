export interface Product {
    _id: string;
    title: string;
    description: string;
    images: string[];
    user: {
      _id: string; // El ID del usuario que posee el producto
    };
  }

export interface ExchangeProposal {
    productOffered: string; // ID del producto ofrecido
    productRequested: string; // ID del producto solicitado
    userRequested: string; // ID del usuario que solicitó el intercambio
}
  