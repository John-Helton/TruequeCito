export interface Product {
    _id: string;
    title: string;
    description: string;
    images: string[];
    user: {
      _id: string; // El ID del usuario que posee el producto
      username: string; // El nombre de usuario del propietario del producto
    };
  }

  export interface ExchangeProposal {
    productOffered: {
      _id: string;
      images: string[]; // Imágenes del producto ofrecido
      user: {
        _id: string;
        username: string; // El nombre de usuario del propietario del producto ofrecido
      };
    };
    productRequested: string; // ID del producto solicitado
    userRequested: {
      username: string;
    };
  }

export interface Proposal {
  _id: string;
  productOffered: {
    _id: string;
    title: string;
    description: string;
    image: string;
  };
  productRequested: {
    _id: string;
    title: string;
    description: string;
    image: string;
  };
  userRequested: {
    username: string;
  };
  status: string;
}