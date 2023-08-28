import { EntityRepository, Repository } from 'typeorm';
import { PdfEntity } from './pdf.entity';

@EntityRepository(PdfEntity)
export class PdfRepository extends Repository<PdfEntity> {}
