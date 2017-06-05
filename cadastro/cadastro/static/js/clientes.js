var clientes = new Vue({
	el: '#app-clientes',
	mounted: function() {
		this.listarClientes();
		this.carregarEstados();
	},
	data: {
		estados: [],
		cidades: [],
		ufSelected: '',
		cidadeSelected: '',
		id: '',
		nome: '',
		email: '',
		tel_celular: '',
		tel_fixo: '',
		sexo: '',
		cep: '',
		endereco: '',
		msgSuccess: '',
		msgAlert: '',
		clientesList: [],
	},
	methods: {
		listarClientes: function() {
			self = this;

			self.$http.get('/clientes/listar').then(function(response) {
				self.clientesList = response.data;
			});
		},
		carregarEstados: function() {

			self = this;

			self.$http.get('/estados').then(function(response) {
				self.estados = response.data;
			});

		},
		carregarCidades: function(cidadeSelected) {

			var self = this;

			var idUf = this.ufSelected;

			this.cidadeSelected = '';

			self.$http.get('/cidades/' + idUf).then(function(response) {
				self.cidades = response.data;

                //Tenho que garantir que não estou recebendo
                //um evento como primeiro parâmetro
                if(!(cidadeSelected instanceof Event)) {
                    self.cidadeSelected = cidadeSelected;
                }

			});

		},
		salvarCliente: function() {

			var dadosCliente = {
				_token: window.Laravel.csrfToken,
				nome: this.nome,
				email: this.email,
				tel_celular: this.tel_celular,
				tel_fixo: this.tel_fixo,
				sexo: this.sexo,
				cep: this.cep,
				estado_id: this.ufSelected,
				cidade_id: this.cidadeSelected,
				endereco: this.endereco
			}


			self = this;


			if(self.id.length == 0) {

				self.$http.post('/clientes/create', dadosCliente).then(function(response) {

					self.msgSuccess = 'Cliente cadastrado com sucesso.';

					$('.alert-success').slideDown();
					setTimeout(function(){$('.alert-success').slideUp();}, 2000);

					self.ufSelected = '';
					self.cidadeSelected = '';
					self.nome = '',
					self.email = '',
					self.tel_celular = '';
					self.tel_fixo = '';
					self.sexo = '';
					self.cep = '';
					self.endereco = '';

					self.listarClientes();

				});

			} else {

				self.$http.put('/clientes/' + self.id, dadosCliente).then(function(response) {

					self.msgSuccess = 'Cliente atualizado com sucesso.';

					$('.alert-success').slideDown();
					setTimeout(function(){$('.alert-success').slideUp();}, 2000);

					self.ufSelected = '';
					self.cidadeSelected = '';
					self.nome = '',
					self.email = '',
					self.tel_celular = '';
					self.tel_fixo = '';
					self.sexo = '';
					self.cep = '';
					self.endereco = '';

					self.listarClientes();

					$('#modalNovo').modal('hide');

				});

			}


		},
		editarCliente: function(e, idCliente) {

			e.preventDefault();

			self = this;

			self.$http.get('/clientes/' + idCliente + '/edit').then(function(response) {

				self.id = response.data.id;
				self.ufSelected = response.data.estado_id;
				self.nome = response.data.nome;
				self.email = response.data.email;
				self.tel_celular = response.data.tel_celular;
				self.tel_fixo = response.data.tel_fixo;
				self.sexo = response.data.sexo;
				self.cep = response.data.cep;
				self.endereco = response.data.endereco;

                self.carregarCidades(response.data.cidade_id);

			});


			$('#modalNovo').modal();

		},
		exluirCliente: function(e, idCliente) {

			e.preventDefault();

			self = this;

			self.$http.get('/clientes/' + idCliente + '/delete').then(function(response) {

				self.id = response.data.id;
				self.ufSelected = response.data.estado_id;
				self.nome = response.data.nome;
				self.email = response.data.email;
				self.tel_celular = response.data.tel_celular;
				self.tel_fixo = response.data.tel_fixo;
				self.sexo = response.data.sexo;
				self.cep = response.data.cep;
				self.endereco = response.data.endereco;

                self.carregarCidades(response.data.cidade_id);

			});


			$('#modalNovo').modal();

		}
	}
});
