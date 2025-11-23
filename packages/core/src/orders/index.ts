/**
 * Orders Module Exports
 * 
 * Exports all order-related components.
 */

// Domain - Aggregates
export { Order, OrderStatus, type OrderProps, type DomainEvent } from './domain/aggregates/Order';

// Domain - Entities
export { OrderItem, type OrderItemProps } from './domain/entities/OrderItem';

// Domain - Value Objects
export { OrderNumber } from './domain/value-objects/OrderNumber';
export { ShippingAddress, type ShippingAddressProps } from './domain/value-objects/ShippingAddress';

// Domain - Repositories
export {
  type IOrderRepository,
  type OrderSearchFilters,
  type OrderSearchResult,
} from './domain/repositories/IOrderRepository';

// Infrastructure - Repositories
export { PrismaOrderRepository } from './infrastructure/repositories/PrismaOrderRepository';

// Application - DTOs
export {
  type CreateOrderDTO,
  type ShippingAddressDTO,
  type UpdateOrderStatusDTO,
  type SearchOrdersDTO,
  type OrderResponseDTO,
  type OrderItemDTO,
  type OrderSearchResponseDTO,
  type OrderDetailResponseDTO,
} from './application/dtos/OrderDTO';

// Application - Use Cases
export { CreateOrderUseCase } from './application/use-cases/CreateOrderUseCase';
export { GetOrderUseCase } from './application/use-cases/GetOrderUseCase';
export { GetOrderHistoryUseCase } from './application/use-cases/GetOrderHistoryUseCase';
export { CancelOrderUseCase } from './application/use-cases/CancelOrderUseCase';
export { ShipOrderUseCase } from './application/use-cases/ShipOrderUseCase';
export { MarkOrderDeliveredUseCase } from './application/use-cases/MarkOrderDeliveredUseCase';
