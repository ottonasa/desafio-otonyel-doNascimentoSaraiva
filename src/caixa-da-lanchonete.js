// ### DESCONTOS E TAXAS
//  Ok - Pagamento em dinheiro tem 5% de desconto
//  Ok - Pagamento a crédito tem acréscimo de 3% no valor total

// ### OUTRAS REGRAS

// Ok - Caso item extra seja informado num pedido que não tenha o respectivo item principal, apresentar mensagem "Item extra não pode ser pedido sem o principal".
// Ok - Combos não são considerados como item principal.
// Ok - É possível pedir mais de um item extra sem precisar de mais de um principal.
// Ok - Se não forem pedidos itens, apresentar mensagem "Não há itens no carrinho de compra!"
// OK - Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!".
// Ok - Se o código do item não existir, apresentar mensagem "Item inválido!"
// Ok - Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!"


class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { preco: 3.00, itemExtra: [] },
            chantily: { preco: 1.50, itemExtra: ['cafe'] },
            suco: { preco: 6.20, itemExtra: [] },
            sanduiche: { preco: 6.50, itemExtra: [] },
            queijo: { preco: 2.00, itemExtra: ['sanduiche'] },
            salgado: { preco: 7.25, itemExtra: [] },
            combo1: { preco: 9.50, itemExtra: [] },
            combo2: { preco: 7.50, itemExtra: [] },
        };
        this.descontoDinheiro = 0.05;
        this.acrescimoCredito = 0.03;
    }
    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length <= 0) {
            return "Não há itens no carrinho de compra!"
        }

        const carrinho = {};

        for (const itemString of itens) {
            const [codigo, quantidadeString] = itemString.split(',');
            const quantidade = parseInt(quantidadeString);

            if (quantidade <= 0) {
                return "Quantidade inválida!"
            }

            if (this.cardapio[codigo]) {
                if (!carrinho[codigo]) {
                    carrinho[codigo] = 0;
                }
                carrinho[codigo] += quantidade;
            } else {
                return "Item inválido!"
            }
        }

        let totalAPagar = 0;

        for (let codigo in carrinho) {
            let item = this.cardapio[codigo];
            totalAPagar += item.preco * carrinho[codigo];
        }


        if (metodoDePagamento === 'dinheiro') {
            totalAPagar -= totalAPagar * this.descontoDinheiro;
        } else if (metodoDePagamento === 'credito') {
            totalAPagar += totalAPagar * this.acrescimoCredito;
        } else if (metodoDePagamento !== 'debito' && metodoDePagamento !== 'credito' && metodoDePagamento !== 'dinheiro') {
            return "Forma de pagamento inválida!"
        }
        for (let codigo in carrinho) {
            let item = this.cardapio[codigo];

            if (item.itemExtra.length > 0) {
                const itemPrincipal = item.itemExtra[0];

                if (!carrinho[itemPrincipal]) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
        }
        return `R$ ${totalAPagar.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete }