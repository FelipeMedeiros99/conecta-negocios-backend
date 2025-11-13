import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriaService {
  constructor (private readonly prisma: PrismaService){}

  private readonly defaultCategories = [
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

  async onModuleInit(){
    try {
      const count = await this.prisma.categoria.count();
      if (count > 0) {
        console.log('Categorias já populadas. Seed ignorado.');
        return;
      }

      console.warn('Nenhuma categoria encontrada. Populando o banco...');

      const dataToCreate = this.defaultCategories.map((nome) => ({
        nome: nome,
      }));
      
      // 7. Usa createMany para inserir todas de uma vez (eficiente)
      const result = await this.prisma.categoria.createMany({
        data: dataToCreate,
        skipDuplicates: true, // Garante que não vai quebrar se algo já existir
      });

      console.log(`${result.count} categorias padrão criadas com sucesso.`);
    
    } catch (error) {
      console.error('Falha ao popular categorias padrão:', error);
    }
  }


  create(createCategoriaDto: CreateCategoriaDto) {
    return 'This action adds a new categoria';
  }

  findAll() {
    return `This action returns all categoria`;
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
