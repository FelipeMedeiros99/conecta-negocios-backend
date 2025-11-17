import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Categoria } from '../../generated/client';

@Injectable()
export class CategoriaService {
  constructor (private readonly prisma: PrismaService){}

  private readonly logger = new Logger(CategoriaService.name);

  async onModuleInit(){
    const categoriaServicos = [
      // Serviços
      'SERVIÇOS DOMÉSTICOS',
      'REPARAÇÃO | CONSERTO | REFORMA',
      'SERVIÇOS DE TI',
      'AULAS E CURSOS',
      'CONSULTORIA',
      'EVENTOS',
      'SAÚDE | BELEZA | BEM-ESTAR',
      'TRANSPORTE | MUDANÇAS',
      'TURISMO',
      'PROFISSIONAIS LIBERAIS',
      'TRADUÇÃO',
      'OUTROS',
    ]
  
    const categoriaProdutos = [
      // Produtos
      'IMOVEIS',
      'AUTOS',
      'AUTOPEÇAS',
      'CASA | DECORAÇÃO | UTENSÍLIOS',
      'MÓVEIS',
      'ELETRO',
      'MATERIAIS DE CONSTRUÇÃO',
      'CELULARES | TELEFONIA',
      'INFORMÁTICA',
      'GAMES',
      'TVs | VÍDEO',
      'ÁUDIO',
      'CÂMERAS | DRONES',
      'MODA | BELEZA',
      'COMÉRCIO',
      'ESCRITÓRIO',
      'MÚSICA | HOBBIES',
      'ESPORTES | FITNESS',
      'ARTIGOS INFANTIS',
      'ANIMAIS DE ESTIMAÇÃO',
      'AGRO E INDUSTRIA'
    ];
  
    try {
      const count = await this.prisma.categoria.count();
      if (count ===  33) {
        this.logger.log('Categorias já populadas. Seed ignorado.');
        return;
      }

      this.logger.warn('Nenhuma categoria encontrada. Populando o banco...');

      const categoriasParaCriar: Omit<Categoria, "id">[] = []
      categoriaProdutos.forEach((nome) => (
        categoriasParaCriar.push({
        nome: nome,
        tipo: "PRODUTO"
      })));

      categoriaServicos.forEach((nome) => (
        categoriasParaCriar.push({
        nome: nome,
        tipo: "SERVICO"
      })));
      
      

      const result = await this.prisma.categoria.createMany({
        data: categoriasParaCriar,
        skipDuplicates: true,
      });

      this.logger.log(`${result.count} categorias padrão criadas com sucesso.`);
    
    } catch (error) {
      this.logger.error('Falha ao popular categorias padrão:', error);
    }
  }


  create(createCategoriaDto: CreateCategoriaDto) {
    return 'This action adds a new categoria';
  }

  async findAll() {
    try{
      return await this.prisma.categoria.findMany();
    }catch(e){
      this.logger.error("Erro enquanto tentava buscar categorias")
      throw new HttpException("Erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
