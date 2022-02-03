import { Controller, Get, Query, Param , Body } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {

    @Get(':categoryId/pizzas/:pizzaId')
    getCategories(
        @Param('pizzaId') pizzaId: string,
        @Param('categoryId') categoryId: string
    ) {
        return {
            "message": `category ${categoryId} pizza ${pizzaId}`
        }
    }
}
