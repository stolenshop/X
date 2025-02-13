const { createApp } = Vue;

createApp({
    data() {
        return {
            products: [
                { id: 1, name: 'Papa Dorada', price: 15.99, quantity: 0 },
                { id: 2, name: 'Papa Violeta', price: 18.99, quantity: 0 },
                { id: 3, name: 'Papa Negra', price: 12.99, quantity: 0 }
                { id: 4, name: 'Papa Dorada', price: 15000.99, quantity: 0 },
                { id: 5, name: 'Papa Violeta', price: 18000.99, quantity: 0 },
                { id: 6, name: 'Papa Negra', price: 12000.99, quantity: 0 }
            ],
            cart: {
                items: [],
                total: 0,
                totalItems: 0
            },
            order: {
                name: '',
                address: '',
                phone: '',
                payment: 'online'
            },
            orderConfirmation: ''
        }
    },
    methods: {
        increaseQuantity(product) {
            product.quantity++;
        },
        decreaseQuantity(product) {
            if (product.quantity > 0) product.quantity--;
        },
        addToCart(product) {
            if (product.quantity > 0) {
                const existingItem = this.cart.items.find(item => item.product.id === product.id);
                
                if (existingItem) {
                    existingItem.quantity += product.quantity;
                } else {
                    this.cart.items.push({
                        product: { ...product },
                        quantity: product.quantity
                    });
                }
                
                product.quantity = 0;
                this.updateCartTotals();
            }
        },
        removeFromCart(index) {
            this.cart.items.splice(index, 1);
            this.updateCartTotals();
        },
        updateCartTotals() {
            this.cart.total = this.cart.items.reduce((acc, item) => 
                acc + (item.product.price * item.quantity), 0);
            this.cart.totalItems = this.cart.items.reduce((acc, item) => 
                acc + item.quantity, 0);
        },
        validateForm() {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(this.order.phone)) {
                alert('Por favor ingresa un número de teléfono válido (10 dígitos)');
                return false;
            }
            return true;
        },
        async sendOrder() {
            if (!this.validateForm()) return;
            
            try {
                // Simulación de envío a API
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                this.orderConfirmation = `¡Pedido enviado! Gracias ${this.order.name}. ` +
                    `Total: $${this.cart.total.toFixed(2)}. ` +
                    `Forma de pago: ${this.order.payment === 'online' ? 'Pago en línea' : 'Contra entrega'}.`;
                
                // Resetear datos
                this.cart.items = [];
                this.updateCartTotals();
                this.order = {
                    name: '',
                    address: '',
                    phone: '',
                    payment: 'online'
                };

                const message = `Hola, soy ${this.order.name}. Mi pedido es: 
${this.cart.items.map(item => `${item.product.name} (×${item.quantity})`).join(', ')}
Total: $${this.cart.total.toFixed(2)}`;

const whatsappLink = `https://wa.me/521234567890?text=${encodeURIComponent(message)}`;
window.open(whatsappLink, '_blank');
                
            } catch (error) {
                console.error('Error al enviar el pedido:', error);
                alert('Ocurrió un error al procesar tu pedido. Por favor intenta nuevamente.');
            }
        }
    }
}).mount('#app');
